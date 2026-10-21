import React, { useState } from 'react';
import { X, AlertCircle, Send, CheckCircle2 } from 'lucide-react';
import { MedicalCenter } from '../data/centers';

interface ReportModalProps {
  center: MedicalCenter | null;
  onClose: () => void;
  onSubmitReport: (k: number, reason: string, details: string) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  center,
  onClose,
  onSubmitReport,
}) => {
  const [reason, setReason] = useState('phone');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!center) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(center.k, reason, details);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl z-10 border border-slate-200 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">
              گزارش خطا یا تغییر مشخصات مرکز
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900">گزارش شما ثبت شد</h4>
            <p className="text-xs text-slate-500">
              با تشکر از همکاری شما در به‌روزرسانی اطلاعات همکاران.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 space-y-3.5 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[11px]">مرکز انتخابی:</span>
              <strong className="text-slate-900 font-bold block mt-0.5">
                {center.name}
              </strong>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                نوع مشکل یا تغییر:
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0a4c9a]"
              >
                <option value="phone">شماره تلفن اشتباه یا خاموش است</option>
                <option value="address">مرکز به نشانی دیگری نقل مکان کرده است</option>
                <option value="contract">قرارداد با بیمه کارآفرین لغو شده است</option>
                <option value="timing">ساعات کاری یا شبانه‌روزی بودن تغییر کرده است</option>
                <option value="other">سایر موارد</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                توضیحات تکمیلی یا شماره/نشانی صحیح (اختیاری):
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="مثلاً: شماره جدید مرکز 04433... است یا به ساختمان روبرو منتقل شده..."
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0a4c9a] resize-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#0a4c9a] hover:bg-blue-900 text-white font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ارسال گزارش</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
