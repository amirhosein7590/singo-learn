/**
 * @file Sessions.jsx
 * @description 
 * This file implements the **Admin Sessions Management** page.  
 * It allows administrators to manage **course sessions (Seasions)** and their corresponding **lectures (Sessions)**.  
 * The page provides features to **create, edit, and delete sessions/seasions**, while displaying them in a dynamic table with pagination.
 *
 * @component Sessions
 * @returns {JSX.Element} A page for managing course sessions and related entities in the admin panel.
 *
 * @features
 * - **Add New Seasion**: 
 *   Uses `EditForm` to create a new course seasion (chapter) with configurable input fields.  
 *   Pagination is supported when fetching courses to attach the seasion to.
 *
 * - **Add New Session**: 
 *   Provides a second `EditForm` to create an actual session (lecture).  
 *   Supports pagination for sessions and integrates validation patterns via `useCreateSessionInput`.
 *
 * - **Seasion Table**: 
 *   Displays all existing seasions in a scrollable and paginated `Table` component.  
 *   Includes actions like **edit** and **remove**, each wired to handlers and state tracking.
 *
 * - **Action Handling**:
 *   - **Remove**: Opens a confirmation `Alert` modal before deleting.  
 *   - **Edit**: Opens a `Modal` with pre-filled input patterns (using `useEditSeasionInput`) to update seasion details.  
 *     Handles transformation of string-based values (like `"false"`) into booleans.
 *
 * - **Global State Handlers**:  
 *   Utilizes centralized setters (`alertSetter`, `modalSetter`, `resgisterToastSetter`) for managing modals, alerts, and toast notifications globally.
 *
 * - **Pending State Tracking**:  
 *   A `pendingKeysRef` Set tracks which seasion/session is currently under an action (like delete or edit) to provide fine-grained UI feedback.  
 *   `actionPending` consolidates async operation loading states.
 *
 * - **Lazy Loaded UI Components**:  
 *   `Modal`, `Toast`, and `Alert` are dynamically imported to improve performance.
 *
 * - **Document Title**:  
 *   Automatically updates the browser tab title to `"مدیریت جلسات"` for better UX.
 *
 * @hooks
 * - `useCreateSeasionInputs`: Provides inputs and pagination for creating new seasions.  
 * - `useCreateSessionInput`: Provides inputs and pagination for creating new sessions.  
 * - `useSeasionTableDatas`: Fetches and formats seasion data into table-ready `thead` and `tbody`.  
 * - `useCreateSeasion`: Handles creation of a seasion with async loading state.  
 * - `useCreateSession`: Handles creation of a session with async pending state.  
 * - `useEditSeasionInput`: Generates input patterns for editing a seasion.  
 * - `useRemoveSeasion`: Handles deletion of a seasion.  
 * - `useEditSeasion`: Handles updating seasion details.  
 *
 * @optimizations
 * - **Memoization**: Wrapped in `memo` to prevent unnecessary re-renders when props/state do not change.  
 * - **Lazy Imports**: Heavy components (Modal, Toast, Alert) are only loaded when needed.  
 * - **Ref-based Tracking**: Instead of state-based arrays, `useRef` is used for tracking pending actions efficiently without extra re-renders.
 *
 * @usage
 * ```jsx
 * import Sessions from "./Sessions";
 * 
 * // Inside Admin Router
 * <Route path="/admin/sessions" element={<Sessions />} />
 * ```
 */


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
    document.title = 'مدیریت جلسات'
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
