/**
 * @file Offs.jsx
 * @description
 * Admin panel page for **managing course discounts (offs)**.  
 * Allows administrators to apply single or bulk discounts, edit existing ones, and remove them.
 *
 * @component Offs
 * @returns {JSX.Element} The full discount management interface for administrators.
 *
 * @features
 * - **Apply Single Discount**:
 *   - Uses `EditForm` with `useCreateInputPattern` to assign a discount to a specific course.
 *   - Supports pagination when selecting from available courses (`fetchNextCourse`, `hasNextCourse`).
 *
 * - **Apply Bulk Discount**:
 *   - Provides an additional button to apply a discount across **all courses** simultaneously.
 *   - Uses `useAddMultipleOff` for backend integration.
 *
 * - **Discounts Table**:
 *   - Displays all created discounts in a paginated `Table`.  
 *   - Infinite scrolling supported (`loadMoreOff`, `isFetchingNextOff`).
 *   - Row actions include **edit** and **remove**.
 *
 * - **Action Handling**:
 *   - **edit**: Opens a `Modal` with dynamic input patterns from `useEditInputPatterns`.  
 *     Allows the admin to update discount details.
 *   - **remove**: Displays an `Alert` confirmation before permanently deleting a discount.
 *
 * - **Global State Controllers**:
 *   - `modalSetter`, `alertSetter`, and `resgisterToastSetter` bind modals, alerts, and toasts to local state.
 *   - Ensures consistent UI feedback for actions.
 *
 * - **Pending State Tracking**:
 *   - `pendingKeysRef` tracks which discount IDs are currently under an operation (edit/remove).  
 *   - `actionPending` maps async loaders for visual feedback during removal.
 *
 * - **Document Title**:
 *   - Automatically updates the browser tab title to `"مدیریت تخفیف ها"`.
 *
 * @hooks
 * - `useCreateInputPattern`: Provides inputs and pagination for discount creation.
 * - `useAddSingleOff`: Creates a discount for one course.
 * - `useAddMultipleOff`: Applies a discount across all courses.
 * - `useTableDatas`: Fetches and maps discounts into table-ready format.
 * - `useEditOff`: Updates discount details.
 * - `useEditInputPatterns`: Generates input fields for editing discounts.
 * - `useRemoveOff`: Removes a discount.
 *
 * @optimizations
 * - **Lazy Loading**: Modal, Toast, and Alert are dynamically imported to reduce initial page load.
 * - **Ref-based Action Tracking**: Efficiently tracks ongoing edit/remove operations without unnecessary re-renders.
 *
 * @usage
 * ```jsx
 * import Offs from "./Offs";
 *
 * <Route path="/dashboard/admin/offs" element={<Offs />} />
 * ```
 */


import { lazy, useState, useEffect , useRef } from "react";
const Modal = lazy(() => import("../../../components/sections/Modal"));
import { modalSetter, showModalHandler } from "../../../utils/ModalController";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import { resgisterToastSetter } from "../../../utils/ToastController";
const Alert = lazy(() => import("../../../components/sections/Alert"));
import { alertSetter, showAlertHandler } from "../../../utils/AlertController";
import Table from "../../../components/sections/Table/Index";
import EditForm from "../../../components/sections/EditForm";
import useCreateInputPattern from "../../../hooks/Admin/Offs/Table/useCreateInputPattern";
import useAddSingleOff from "../../../hooks/Admin/Offs/useAddSingleOff";
import useAddMultipleOff from "../../../hooks/Admin/Offs/useAddMultipleOff";
import useTableDatas from "../../../hooks/Admin/Offs/Table/useTableDatas";
import useEditOff from "../../../hooks/Admin/Offs/useEditOff";
import useEditInputPatterns from "../../../hooks/Admin/Offs/Table/useEditInputPatterns";
import useRemoveOff from "../../../hooks/Admin/Offs/useRemoveOff";

function Offs() {
  const [showToast, setShowToast] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const pendingKeysRef = useRef(new Set());

  const {
    createInputPattern,
    fetchNextCourse,
    hasNextCourse,
    isFetchingNextCourse,
  } = useCreateInputPattern();
  const { addSingleOff, addSingleOffLoading } = useAddSingleOff();
  const { addMultipleOff, addMultipleOffLoading } = useAddMultipleOff();
  const { editOff, editOffLoading } = useEditOff();
  const { tableDatas, loadMoreOff, isFetchingNextOff } = useTableDatas();
  const { editInputPatterns } = useEditInputPatterns();
  const { removeOff, removeOffLoading } = useRemoveOff();

  useEffect(() => {
    alertSetter(setShowAlert);
    resgisterToastSetter(setShowToast);
    modalSetter(setShowModal);
    document.title = 'مدیریت تخفیف ها'
  }, []);

  const buttons = [
    {
      id: 1,
      type: "button",
      targetValue: "percentage",
      isPending: addMultipleOffLoading,
      text: "اعمال تخفیف همه دوره ها",
      onClick: addMultipleOff,
      classes:
        "!text-xs lg:!text-sm !p-2 mr-2 rounded-md bg-blue-600 text-white",
    },
  ];

  const addPending = (offId, action) => {
    pendingKeysRef.current.add(`${offId}:${action}`);
  };
  const removePending = (offId, action) => {
    pendingKeysRef.current.delete(`${offId}:${action}`);
  };

  const actionHandler = (infos) => {
    let { entityData: off, action: actionType } = infos;
    addPending(off.id , actionType)

    switch (actionType) {
      case "edit": {
        let inputPatterns = editInputPatterns(off);
        showModalHandler({
          inputPatterns,
          isEdit: true,
          isPending: editOffLoading,
          onAction: (data) => editOff(off.id, data),
          tableData: [],
          title: "ویرایش تخفیف",
        });
        break;
      }
      case "remove": {
        showAlertHandler({
          cancelText: "انصراف",
          confirmText: "حذف",
          icon: "warning",
          onConfirm: async () => {
            await removeOff(off.id)
            removePending(off.id , actionType)
          },
          title: "آیا از حذف اطمینان دارید ؟",
        });
        break;
      }
    }
  };

  const actionPending = {
    remove: removeOffLoading,
  };
  return (
    <>
      <div className="wrapper flex flex-col">
        <div className="add-off py-3 px-6 flex flex-col">
          <EditForm
            title="اعمال تخفیف"
            inputPatterns={createInputPattern}
            isPending={addSingleOffLoading}
            btnText="اعمال تخفیف تکی"
            onAction={(data) =>
              addSingleOff(data.courseId, { percentage: data.percentage })
            }
            buttons={buttons}
            fetchNextPage={fetchNextCourse}
            hasNextPage={hasNextCourse}
            isFetchingNextPage={isFetchingNextCourse}
          />
        </div>
        <div className="py-3 px-6">
          <Table
            thead={tableDatas.thead}
            tbody={tableDatas.tbody}
            scroll={true}
            actionPending={actionPending}
            onAction={actionHandler}
            isFetchingNextPage={isFetchingNextOff}
            loadMoreRef={loadMoreOff}
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

export default Offs;
