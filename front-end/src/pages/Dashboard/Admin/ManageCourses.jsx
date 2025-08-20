import { act, lazy, useEffect, useState } from "react";
const Modal = lazy(() => import("../../../components/sections/Modal"));
import { modalSetter, showModalHandler } from "../../../utils/ModalController";
const Toast = lazy(() => import("../../../components/sections/Toast"));
import { resgisterToastSetter } from "../../../utils/ToastController";
const Alert = lazy(() => import("../../../components/sections/Alert"));
import { alertSetter, showAlertHandler } from "../../../utils/AlertController";
import EditForm from "../../../components/sections/EditForm";
import useListCourses from "../../../hooks/Admin/Courses/useListCourses";
import CreateCourse from "../../../constants/InputPatterns/Admin/Courses/CreateCourse";
import useCreateCourse from "../../../hooks/Admin/Courses/useCreateCourse";
import Table from "../../../components/sections/Table/Index";
import useTableDatas from "../../../hooks/Admin/Courses/Table/useTableDatas";
import useRemoveCourse from "../../../hooks/Admin/Courses/useRemoveCourse";
import useEditInputPattern from "../../../hooks/Admin/Courses/Table/useEditInputPattern";
import useEditCourse from '../../../hooks/Admin/Courses/useEditCourse'
import useImageCourse from "../../../hooks/Admin/Courses/useImageCourse";
import useIconCourse from "../../../hooks/Admin/Courses/useIconCourse";

function ManageCourses() {
  const [showToast, setShowToast] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const {
    courses,
    coursesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
  } = useListCourses(false);

  const { createCourse, createCoursePending } = useCreateCourse();
  const { tableDatas } = useTableDatas(courses);
  const { editInputPatterns } = useEditInputPattern();
  const { removeCourse, removeCourseLoading } = useRemoveCourse();
  const {editCourse,editCourseLoading} = useEditCourse();
  const {editImage , editImageLoading} = useImageCourse()
  const {editIcon , editIconLoading} = useIconCourse()

  const actionHandler = (infos) => {
    let {entityData : course , action : actionType , files} = infos;
    switch (actionType) {
      case "remove": {
        showAlertHandler({
          cancelText: "انصراف",
          confirmText: "حذف",
          icon: "warning",
          onConfirm: () => removeCourse(course.id),
          title: "آیا از حذف اطمینان دارید ؟",
        });
        break;
      }
      case "edit": {
        let inputPatterns = editInputPatterns(course);
        showModalHandler({
          inputPatterns,
          isEdit: true,
          isPending: editCourseLoading,
          onAction: (data) => editCourse(course.id , data),
          tableData: [],
          title: "ویرایش دوره",
        });
        break;
      }
      case 'editIcon' : {
        editIcon(course.id , files)
        break;
      }
      case 'editImage' : {
        editImage(course.id , files)
        break;
      }
    }
  };

  const actionPending = {
    remove: removeCourseLoading,
    edit : editCourseLoading,
    editImage : editImageLoading,
    editIcon : editIconLoading
  };

  useEffect(() => {
    alertSetter(setShowAlert);
    resgisterToastSetter(setShowToast);
    modalSetter(setShowModal);
  }, []);
  return (
    <>
      <div className="wrapper flex flex-col">
        <div className="add-courses py-3 px-6 flex flex-col">
          <EditForm
            fetchNextPage={fetchNextPage}
            inputPatterns={CreateCourse}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isPending={createCoursePending}
            title={"ایجاد دوره"}
            onAction={createCourse}
          />
        </div>
        <div className="py-3 px-6">
          <Table
            isFetchingNextPage={isFetchingNextPage}
            loadMoreRef={loadMoreRef}
            scroll={true}
            actionPending={actionPending}
            onAction={actionHandler}
            tbody={tableDatas.tbody}
            thead={tableDatas.thead}
          />
        </div>
      </div>

      {showToast?.visible && <Toast {...showToast} />}
      {showAlert?.visible && <Alert {...showAlert} />}
      {showModal?.visible && <Modal {...showModal} />}
    </>
  );
}

export default ManageCourses;
