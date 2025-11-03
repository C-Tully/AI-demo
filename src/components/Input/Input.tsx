type InputProps = {
  label: {
    name: string;
  };
  id: string;
  type?: string;
  labelClassName?: string;
  name: string;
  required?: boolean;
};

export default function Input({
  label,
  labelClassName,
  id,
  type = "text",
  name,
  required,
}: InputProps) {
  return (
    <>
      <label htmlFor={id} className={labelClassName}>
        {" "}
        {label.name}
      </label>
      <input id={id} type={type} name={name} required={required} />
    </>
  );
}
