import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type BaseProps = {
  label: string;
  hint?: string;
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
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

const ReservationField = (props: ReservationFieldProps) => {
  const { label, hint, multiline, ...fieldProps } = props;

  return (
    <label className="block">
      <span className="mb-2.5 block font-sans text-xs font-medium uppercase tracking-[0.08em] text-dp-charcoal/65">
        {label}
      </span>

      {hint && (
        <span className="-mt-1 mb-2.5 block font-sans text-xs leading-5 text-dp-charcoal/50">
          {hint}
        </span>
      )}

      {multiline ? (
        <textarea
          {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`${fieldClassName} ${
            fieldProps.className ?? ""
          }`}
        />
      ) : (
        <input
          {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
          className={`${fieldClassName} ${
            fieldProps.className ?? ""
          }`}
        />
      )}
    </label>
  );
};

export default ReservationField;