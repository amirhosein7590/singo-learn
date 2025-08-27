/**
 * StudentsComments Page
 *
 * Renders a list of all student comments using StdCommentItems component.
 * Sets the document title to "نظرات دانشجویان" when mounted.
 */

import { useEffect } from "react";
import StdCommentItems from "../components/sections/StdCommentItems";
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
