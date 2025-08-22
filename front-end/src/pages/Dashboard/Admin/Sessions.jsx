import { useEffect, useState, lazy, useRef } from "react";
import EditForm from "../../../components/sections/EditForm";
import Table from "../../../components/sections/Table/Index";
const Modal = lazy(() => import("../../../components/sections/Modal"));
import { modalSetter, showModalHandler } from "../../../utils/ModalController";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import { resgisterToastSetter } from "../../../utils/ToastController";
const Alert = lazy(() => import("../../../components/sections/Alert"));
import { alertSetter, showAlertHandler } from "../../../utils/AlertController";
import useCreateSeasion from "../../../hooks/Admin/Seasions/useCreateSeasion";
import useCreateSessionInput from "../../../hooks/Admin/Sessions/Table/useCreateSessionInput";
import useCreateSession from "../../../hooks/Admin/Sessions/useCreateSession";
import useSeasionTableDatas from "../../../hooks/Admin/Seasions/Table/useSeasionTableDatas";
import { memo } from "react";
import useRemoveSeasion from "../../../hooks/Admin/Seasions/useRemoveSeasion";
import useEditSeasion from "../../../hooks/Admin/Seasions/useEditSeasion";
import useEditSeasionInput from "../../../hooks/Admin/Sessions/Table/useEditSeasionInput";
import useCreateSeasionInputs from "../../../hooks/Admin/Seasions/Table/useCreateSeasionInput";

function Sessions() {
  const [showToast, setShowToast] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const pendingKeysRef = useRef(new Set());

  const {
    createSeasionInputs,
    fetchNextCourse,
    hasNextCourse,
    isFetchingNextCourse,
  } = useCreateSeasionInputs();
  const {
    createSessionInputs,
    fetchNextSession,
    hasNextSession,
    isFetchingNextSession,
  } = useCreateSessionInput();
  const { editSeasionInputHandler } = useEditSeasionInput();
  const { seasionTableDatas, loadMoreSeasion, isFetchingNextSeasion } =
    useSeasionTableDatas();
  const { createSeasion, createSeasionLoading } = useCreateSeasion();
  const { createSession, createSessionPending } = useCreateSession();
  const { removeSeasion, removeSeasionLoading } = useRemoveSeasion();
  const { editSeasion, editSeasionLoading } = useEditSeasion();

  const addPending = (seasionId, action) => {
    pendingKeysRef.current.add(`${seasionId}:${action}`);
  };
  const removePending = (seasionId, action) => {
    pendingKeysRef.current.delete(`${seasionId}:${action}`);
  };

  const actionHandler = (infos) => {
    let { entityData: seasion, action: actionType } = infos;
    addPending(seasion.id , actionType)

    switch (actionType) {
      case "remove": {
        showAlertHandler({
          cancelText: "انصراف",
          confirmText: "حذف",
          icon: "warning",
          onConfirm: async() => {
            await removeSeasion(seasion.id)
            removePending(seasion.id , actionType)
          },
          title: "آیا از حذف اطمینان دارید ؟",
        });
        break;
      }
      case "edit": {
        const inputPatterns = editSeasionInputHandler(seasion);
        showModalHandler({
          isEdit: true,
          isPending: editSeasionLoading,
          tableData: [],
          title: "ویرایش سرفصل",
          onAction: (data) => {
            let { isFree, ...others } = data;
            const isFreeBoolean = isFree == "false" ? false : true;
            editSeasion({ isFree: isFreeBoolean, ...others }, seasion.id);
          },
          inputPatterns,
        });
        break;
      }
    }
  };

  const actionPending = {
    remove: removeSeasionLoading,
  };

  useEffect(() => {
    alertSetter(setShowAlert);
    resgisterToastSetter(setShowToast);
    modalSetter(setShowModal);
  }, []);

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
            onAction={(data) => {
              createSession(data);
            }}
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
            pendingKeysRef={pendingKeysRef}
          />
        </div>
      </div>

      {showToast?.visible && <Toast {...showToast} />}
      {showAlert?.visible && <Alert {...showAlert} />}
      {showModal?.visible && <Modal {...showModal} />}
    </>
  );
}

export default memo(Sessions);
