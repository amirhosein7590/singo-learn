import { memo } from "react";
import Button from "../../ui/Button";

function TableCell({type , classes , onClick , text}) {
  return (
    <td className="px-3 py-2">
      {type === "button" ? (
        <Button classes={classes} onclick={onClick}>
          {text.includes('.svg') ? <img className="w-[24px] h-[24px]" src={text} /> : text}
          {/* check for svg icon or regular text */}
        </Button>
      ) : (
        <p className="text-xs lg:text-sm">{text}</p>
      )}
    </td>
  );
}

export default memo(TableCell);
