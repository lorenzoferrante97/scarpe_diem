export default function FormError({ errorText }) {
  return (
    <>
      <div className="form-error-box">
        <p className="form-error-text">{errorText}</p>
      </div>
    </>
  );
}
