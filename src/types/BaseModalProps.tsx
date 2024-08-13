export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  closeButton?: boolean;
  children: React.ReactNode;
  footerButtons: React.ReactNode;
}
