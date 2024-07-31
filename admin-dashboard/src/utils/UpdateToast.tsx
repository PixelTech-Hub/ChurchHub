import { Toast } from "flowbite-react";

const UpdateToast: React.FC<{ success: boolean; error: string | null }> = ({ success, error }) => (
    <>
        {success && (
            <Toast className="fixed bottom-5 right-5 bg-green-500 text-white">
                <div className="text-sm font-normal">Updated successfully</div>
            </Toast>
        )}
        {error && (
            <Toast className="fixed bottom-5 right-5 bg-red-500 text-white">
                <div className="text-sm font-normal">{error}</div>
            </Toast>
        )}
    </>
);

export default UpdateToast;