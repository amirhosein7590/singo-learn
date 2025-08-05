    import { lazy, memo, useCallback, useEffect, useMemo, useState } from "react";
    import EditForm from "../../../components/sections/EditForm";
    import useListCourses from "../../../hooks/Admin/Courses/useListCourses";
    import useRegisterTeacher from "../../../hooks/Admin/Teachers/useRegisterTeacher";
    import { useQueryClient } from "@tanstack/react-query";
    import {
      resgisterToastSetter,
      showToastHandler,
    } from "../../../utils/ToastController";
    import Table from "../../../components/sections/Table/Index";
    import useTeachersList from "../../../hooks/Admin/Teachers/useTeachersList";
    import useTeacherInputPattern from "../../../hooks/Admin/Teachers/Table/useInputPattern";
    import useTableDatas from "../../../hooks/Admin/Teachers/Table/useTableDatas";
    const Toast = lazy(()=> import('../../../components/sections/Toast'))

    function ManageTeachers() {

      const { courses, coursesError, coursesLoading } = useListCourses();
      const queryClient = useQueryClient();
      const [showToast, setShowToast] = useState({});

      const {
        registerTeacher,
        registerTeacherData,
        registerTeacherError,
        registerTeacherLoading,
      } = useRegisterTeacher(queryClient);
      const { allTeachersData, allTeachersError, allTeachersLoading } =
        useTeachersList();

      const allTeachersCourse = ()=>{

      }
      const { teacherInputPattern } = useTeacherInputPattern(
        coursesLoading,
        courses
      );

      const {tableDatas} = useTableDatas(allTeachersCourse,allTeachersData , setShowToast);

      {courses && console.log(courses)}

      useEffect(() => {
        let error = registerTeacherError?.response.data.error;
        let successMessage = registerTeacherData?.message;
        if (error) {
          showToastHandler(error, "error");
        }
        if (successMessage) {
          showToastHandler(successMessage, "success");
        }
      }, [registerTeacherData, registerTeacherError]);

      useEffect(() => {
        resgisterToastSetter(setShowToast);
      }, []);

      return (
        <>
          <div className="wrapper flex flex-col">
            <div className="add-teacher py-3 px-6 flex flex-col">
              {!coursesLoading && (
                <EditForm
                  title={"ایجاد مدرس"}
                  inputPatterns={teacherInputPattern}
                  isPending={registerTeacherLoading}
                  onAction={registerTeacher}
                />
              )}
            </div>
            <div className="py-3 px-6">
              <Table thead={tableDatas.thead} tbody={tableDatas.tbody} />
            </div>
          </div>

          {showToast?.visible && <Toast {...showToast} />}
        </>
      );
    }

    export default memo(ManageTeachers);
