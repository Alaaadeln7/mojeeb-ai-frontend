import { X } from "lucide-react";

export default function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl mb-3 font-semibold bg-gradient-to-r from-[#10a5b1] to-[#3d4d58] bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-sm text-base-content/60 mt-1">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="btn btn-circle btn-error"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}
