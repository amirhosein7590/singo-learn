import { useEffect, useState, lazy, useMemo } from "react";
import EditForm from "../../../components/sections/EditForm";
import Table from "../../../components/sections/Table/Index";
const Modal = lazy(() => import("../../../components/sections/Modal"));
import { modalSetter, showModalHandler } from "../../../utils/ModalController";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import { resgisterToastSetter } from "../../../utils/ToastController";
const Alert = lazy(() => import("../../../components/sections/Alert"));
import { alertSetter, showAlertHandler } from "../../../utils/AlertController";
import useCreateSeasionInput from "../../../hooks/Teacher/Seasion/Table/useCreateSeasionInput";
import useCreateSeasion from "../../../hooks/Teacher/Seasion/useCreateSeasion";

function Sessions() {
  const [showToast, setShowToast] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    alertSetter(setShowAlert);
    resgisterToastSetter(setShowToast);
    modalSetter(setShowModal);
  }, []);

  const {
    createSeasionInputs,
    fetchNextCourse,
    hasNextCourse,
    isFetchingNextCourse,
    teacherCourses,
    teacherCoursesLoading,
  } = useCreateSeasionInput();

  const { createSeasion, createSeasionLoading } = useCreateSeasion();
  return (
    <>
      <div className="wrapper flex flex-col">
        <div className="add-seasion py-3 px-6 flex flex-col mb-5">
          <EditForm
            title="ایجاد سر فصل"
            inputPatterns={createSeasionInputs}
            isPending={createSeasionLoading}
            fetchNextPage={fetchNextCourse}
            hasNextPage={hasNextCourse}
            isFetchingNextPage={isFetchingNextCourse}
            onAction={createSeasion}
          />
        </div>
      </div>

      {showToast?.visible && <Toast {...showToast} />}
      {showAlert?.visible && <Alert {...showAlert} />}
      {showModal?.visible && <Modal {...showModal} />}
    </>
  );
}

export default Sessions;
