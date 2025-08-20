import { lazy, useState, useEffect } from "react";
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

  const actionHandler = (infos) => {
        let {entityData : off , action : actionType} = infos;

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
          onConfirm: () => removeOff(off.id),
          title: "آیا از حذف اطمینان دارید ؟",
        });
        break;
      }
    }
  };

  const actionPending = {
    remove : removeOffLoading
  }
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
