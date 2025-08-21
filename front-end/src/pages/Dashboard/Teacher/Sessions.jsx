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
import useCreateSessionInput from "../../../hooks/Teacher/Sessions/Table/useCreateSessionInput";
import useCreateSession from "../../../hooks/Teacher/Sessions/useCreateSession";
import useSeasionTableDatas from "../../../hooks/Teacher/Seasion/Table/useSeasionTableDatas";
import useEditSeasionInput from '../../../hooks/Teacher/Seasion/Table/useEditSeasionInput'
import useEditSeasion from '../../../hooks/Teacher/Seasion/useEditSeasion'
import useRemoveSeasion from '../../../hooks/Teacher/Seasion/useRemoveSeasion'

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

  const {editSeasionInputHandler} = useEditSeasionInput()

  const { createSession, createSessionPending } = useCreateSession();

  const {
    createSessionInputs,
    fetchNextSession,
    hasNextSession,
    isFetchingNextSession,
  } = useCreateSessionInput();

  const { seasionTableDatas, loadMoreSeasion, isFetchingNextSeasion } =
    useSeasionTableDatas();

  const { createSeasion, createSeasionLoading } = useCreateSeasion();

  const {editSeasion,editSeasionLoading} = useEditSeasion()
  
  const {removeSeasion,removeSeasionLoading}= useRemoveSeasion()

  const actionHandler = (infos)=>{
    let { entityData: seasion, action: actionType } = infos;
    
    switch(actionType){
      case 'remove' : {
        showAlertHandler({
          cancelText : 'انصراف',
          confirmText : 'حذف',
          icon : 'warning',
          onConfirm : ()=> removeSeasion(seasion.id),
          title : 'آیا از حذف اطمینان دارید ؟'
        })
        break;
      }
      case 'edit' : {
        const inputPatterns = editSeasionInputHandler(seasion)
        showModalHandler({
          inputPatterns,
          isEdit : true,
          isPending : editSeasionLoading,
          onAction: (data) => {
            let { isFree, ...others } = data;
            const isFreeBoolean = isFree == "false" ? false : true;
            editSeasion({ isFree: isFreeBoolean, ...others }, seasion.id);
          },
          tableData : [],
          title : 'ویرایش سرفصل'
        })
        break
      }
    }
  }

  const actionPending = {
    remove : removeSeasionLoading
  }
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
        <div className="add-session py-3 px-6 flex flex-col mb-5">
          <EditForm
            title="ایجاد جلسه"
            inputPatterns={createSessionInputs}
            isPending={createSessionPending}
            fetchNextPage={fetchNextSession}
            hasNextPage={hasNextSession}
            isFetchingNextPage={isFetchingNextSession}
            onAction={createSession}
          />
        </div>

        <div className="sessions-table py-3 px-6 mb-5">
          <Table
            thead={seasionTableDatas.thead}
            tbody={seasionTableDatas.tbody}
            scroll={true}
            actionPending={actionPending}
            onAction={actionHandler}
            isFetchingNextPage={isFetchingNextSeasion}
            loadMoreRef={loadMoreSeasion}
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
