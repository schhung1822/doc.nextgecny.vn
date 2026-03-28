import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, X, AlertCircle } from 'lucide-react';
import { VALID_PARTNER_CODES } from '../data/mockData';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PartnerModal({ isOpen, onClose, onSuccess }: PartnerModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_PARTNER_CODES.includes(code.trim().toUpperCase())) {
      setError('');
      // Store verification in sessionStorage so it persists during the session
      sessionStorage.setItem('isPartnerVerified', 'true');
      onSuccess();
    } else {
      setError('Mã xác minh không chính xác. Vui lòng kiểm tra lại hoặc liên hệ với chúng tôi để được hỗ trợ.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <Lock className="h-5 w-5 text-amber-500" />
                Xác minh Đối tác
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 mb-6">
                Tài liệu này dành riêng cho đối tác của NextGenCy. Vui lòng nhập mã xác minh được cấp để tiếp tục.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-slate-700 mb-1">
                    Mã xác minh
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="VD: NEXTGENCY-VIP"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all uppercase"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{error}</p>
                  </motion.div>
                )}

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
