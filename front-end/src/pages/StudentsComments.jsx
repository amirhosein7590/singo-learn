import { useEffect } from "react";
import StdCommentItems from "../components/sections/stdCommentItems";
import stdComments from "../data/StudentComments";

function StudentsComments() {

  useEffect(() => {
    document.title = "نظرات دانشجویان";
  }, []);

  return (
    <main className="flex flex-col">
      {stdComments.map(std => (
        <StdCommentItems key={std.id} {...std} />
      ))}
    </main>
  )
}

export default StudentsComments;
