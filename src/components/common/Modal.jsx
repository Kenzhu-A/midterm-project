export default function Modal({ title = "Confirm", children, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="card max-w-md w-full p-6">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-red-600 text-white cursor-pointer hover:bg-gray-700">Confirm</button>
        </div>
      </div>
    </div>
  );
}
