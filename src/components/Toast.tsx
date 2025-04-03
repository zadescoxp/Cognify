export default function Toast({ message }: { message: string }) {
  return (
    <div
      className={`bg-red-500 w-fit px-4 py-3 text-white font-regular absolute bottom-0 right-0 m-4 shadow-md rounded-lg flex items-center gap-2`}
      style={{
        opacity: 1,
        transition: "opacity 0.3s ease-in-out",
      }}
      ref={(el) => {
        if (el) {
          el.style.opacity = "1";
          setTimeout(() => {
            el.style.opacity = "0";
          }, 3000);
        }
      }}
    >
      {message}
    </div>
  );
}
