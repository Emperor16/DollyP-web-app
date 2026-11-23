import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

type BaseProps = {
  label: string;
  children?: ReactNode;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

type ReservationFieldProps = InputProps | TextareaProps;

const fieldClassName = `
  w-full
  rounded-2xl
  border border-dp-black/10
  bg-[#faf8f4]
  px-5 py-4
  font-sans text-sm
  text-dp-black
  outline-none
  transition-all duration-300
  placeholder:text-dp-charcoal/30
  hover:border-dp-gold/40
  focus:border-dp-gold
  focus:bg-white
  focus:ring-4
  focus:ring-dp-gold/10
`;

const ReservationField = (props: ReservationFieldProps) => {
  const { label, multiline, ...fieldProps } = props;

  return (
    <label className="block">
      <span className="mb-2.5 block font-sans text-xs font-medium uppercase tracking-[0.08em] text-dp-charcoal/65">
        {label}
      </span>

      {multiline ? (
        <textarea
          {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={fieldClassName}
        />
      ) : (
        <input
          {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
          className={fieldClassName}
        />
      )}
    </label>
  );
};

export default ReservationField;
