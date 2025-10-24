export default function Button({ type, children, ...props }) {
  return (
    <button
      type={type}
      className="px-5 py-2.5 rounded-lg bg-zinc-900 text-white font-semibold cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg active:scale-95 active:shadow-md focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      {...props}
    >
      {children}
    </button>
  );
}