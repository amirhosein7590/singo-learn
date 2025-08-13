import { useEffect, useState, lazy } from "react";
import EditForm from "../../../components/sections/EditForm";
import Table from "../../../components/sections/Table/Index";
const Modal = lazy(() => import("../../../components/sections/Modal"));
import { modalSetter, showModalHandler } from "../../../utils/ModalController";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import { resgisterToastSetter } from "../../../utils/ToastController";
const Alert = lazy(() => import("../../../components/sections/Alert"));
import { alertSetter, showAlertHandler } from "../../../utils/AlertController";
import useCreateSeasionInputs from "../../../hooks/Admin/Sessions/Table/useCreateSeasionInput";
import useCreateSeasion from "../../../hooks/Admin/Sessions/useCreateSeasion";
import useCreateSessionInput from "../../../hooks/Admin/Sessions/Table/useCreateSessionInput";
import useCreateSession from "../../../hooks/Admin/Sessions/useCreateSession";
import useSeasionTableDatas from "../../../hooks/Admin/Sessions/Table/useSeasionTableDatas";
import { memo } from "react";

function Sessions() {
  const [showToast, setShowToast] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
  const { seasionTableDatas, loadMoreSeasion, isFetchingNextSeasion } =
    useSeasionTableDatas();
  const { createSeasion, createSeasionLoading } = useCreateSeasion();
  const { createSession, createSessionPending } = useCreateSession();

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

        <div className="add-video py-3 px-6 flex flex-col mb-5">
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
            actionPending={false}
            onAction={() => {}}
            isFetchingNextPage={isFetchingNextSeasion}
            loadMoreRef={loadMoreSeasion}
          />
        </div>

        <div className="sessions-table py-3 px-6 mb-5">
          {/* <Table
                thead={tableDatas.thead}
                tbody={tableDatas.tbody}
                scroll={false}
                actionPending={false}
                onAction={actionHandler}
              /> */}
        </div>
      </div>

      {showToast?.visible && <Toast {...showToast} />}
      {showAlert?.visible && <Alert {...showAlert} />}
      {showModal?.visible && <Modal {...showModal} />}
    </>
  );
}

export default memo(Sessions);
