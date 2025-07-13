export interface Inquiry {
  _id: string;
  question: string;
  answer: string;
  keyword: string;
  role: "user" | "ai";
  createdAt: string;
  updatedAt: string;
}
export interface AddConversationScriptModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export interface FormValues {
  question: string;
  answer: string;
  keyword: string;
}
