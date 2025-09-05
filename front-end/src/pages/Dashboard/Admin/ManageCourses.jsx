/**
 * ManageCourses Component
 * ------------------------
 * Admin dashboard page for managing courses.  
 * Provides features to create, edit, update icons/images, and remove courses.  
 * Utilizes modular hooks, reusable components, and global modal/alert/toast controllers.
 *
 * @component
 * @returns {JSX.Element} Courses management panel with:
 * - Course creation form
 * - Paginated & scrollable courses table
 * - Modal for editing course details
 * - Alert for confirmation dialogs
 * - Toast for notifications
 *
 * @state
 * @property {Object} showToast - Controls visibility and content of toast notifications.
 * @property {boolean} showModal - Controls modal visibility for editing courses.
 * @property {boolean} showAlert - Controls alert visibility for confirming destructive actions.
 *
 * @hooks
 * - useListCourses: Fetches list of courses with infinite pagination support.
 * - useCreateCourse: Handles course creation requests.
 * - useRemoveCourse: Deletes courses from the system.
 * - useEditCourse: Updates existing course details.
 * - useImageCourse / useIconCourse: Updates course cover image and icon respectively.
 * - useEditInputPattern: Generates form fields for editing course.
 * - useTableDatas: Prepares structured data for the table component.
 *
 * @functions
 * @function addPending(courseId, action) - Tracks pending state for specific course actions.
 * @function removePending(courseId, action) - Removes pending state after action completion.
 * @function actionHandler(infos) - Centralized handler for all course-related actions:
 *   - "remove": Opens alert confirmation before deletion.
 *   - "edit": Opens modal with editable course fields.
 *   - "editIcon": Uploads new course icon.
 *   - "editImage": Uploads new course image.
 *
 * @effects
 * - Registers modal, toast, and alert setters with global controllers.
 * - Sets document title to "مدیریت دوره ها".
 */


import { act, lazy, useEffect, useRef, useState } from "react";
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
import useEditCourse from "../../../hooks/Admin/Courses/useEditCourse";
import useImageCourse from "../../../hooks/Admin/Courses/useImageCourse";
import useIconCourse from "../../../hooks/Admin/Courses/useIconCourse";

function ManageCourses() {
  const [showToast, setShowToast] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const pendingKeysRef = useRef(new Set());

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
  const { editCourse, editCourseLoading } = useEditCourse();
  const { editImage, editImageLoading } = useImageCourse();
  const { editIcon, editIconLoading } = useIconCourse();

  const addPending = (courseId, action) => {
    pendingKeysRef.current.add(`${courseId}:${action}`);
  };
  const removePending = (courseId, action) => {
    pendingKeysRef.current.delete(`${courseId}:${action}`);
  };

  const actionHandler = async (infos) => {
    let { entityData: course, action: actionType, files } = infos;
    addPending(course.id, actionType);

    switch (actionType) {
      case "remove": {
        showAlertHandler({
          cancelText: "انصراف",
          confirmText: "حذف",
          icon: "warning",
          onConfirm: async () => {
            await removeCourse(course.id);
            removePending(course.id, action);
          },
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
          onAction: (data) => editCourse(course.id, data),
          tableData: [],
          title: "ویرایش دوره",
        });
        break;
      }
      case "editIcon": {
        await editIcon(course.id, files);
        removePending(course.id, action);
        break;
      }
      case "editImage": {
        await editImage(course.id, files);
        removePending(course.id, action);
        break;
      }
    }
  };

  const actionPending = {
    remove: removeCourseLoading,
    edit: editCourseLoading,
    editImage: editImageLoading,
    editIcon: editIconLoading,
  };

  useEffect(() => {
    alertSetter(setShowAlert);
    resgisterToastSetter(setShowToast);
    modalSetter(setShowModal);
    document.title = 'مدیریت دوره ها'
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
            pendingKeysRef={pendingKeysRef}
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
