'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReviewFormProps {
  storeId: number;
}

const ReviewForm = ({ storeId }: ReviewFormProps) => {
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      setError('計算問題の答えが間違っています。');
      generateCaptcha(); // 新しい問題を作成
      return;
    }

    if (!rating || !comment) {
      setError('評価とコメントは必須です。');
      return;
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          store_id: storeId,
          rating: parseInt(rating, 10),
          comment,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'レビューの投稿に失敗しました。');
      }

      // フォームをリセット
      setRating('');
      setComment('');
      setCaptchaAnswer('');
      generateCaptcha();
      
      router.refresh();

    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>レビューを投稿する</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>評価</Label>
            <Select onValueChange={setRating} value={rating}>
              <SelectTrigger>
                <SelectValue placeholder="評価を選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">★★★★★</SelectItem>
                <SelectItem value="4">★★★★☆</SelectItem>
                <SelectItem value="3">★★★☆☆</SelectItem>
                <SelectItem value="2">★★☆☆☆</SelectItem>
                <SelectItem value="1">★☆☆☆☆</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">コメント</Label>
            <Input
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="コメントを入力してください"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="captcha">スパム対策: {captchaNum1} + {captchaNum2} = ?</Label>
            <Input
              id="captcha"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit">投稿する</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;