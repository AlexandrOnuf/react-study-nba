export default interface ButtonProps {
  type: string;
  loadMore?: () => void;
  cta: string;
  linkTo?: string;
}