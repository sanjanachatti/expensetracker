// Present at the botton of the dashboard
// Importing React
import React from "react";

// Importing the styling to be used for Viewing, Editing, Deleting a particular Expense or Income
import { ListGroup, Badge, Row, Col } from "react-bootstrap";
import PencilIcon from "@heroicons/react/solid/PencilIcon";
import XIcon from "@heroicons/react/solid/XIcon";

// Styling the icons of Pencil and X
const IconStyles = {
  height: 20,
  width: 20,
  cursor: "pointer",
  marginRight: "5px",
};

// A resuable export function containing id, amount, category, date, description, to edit and delete a log
export default function AmountItem({
  id,
  amount,
  category,
  date,
  notes,
  onEdit,
  onDelete,
}) {
  return (
    <ListGroup.Item className="my-2 px-4 shadow rounded">
      {/* Card view of Income/Expense listing */}
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          top: 1,
          right: 1,
        }}
      >
      {/* Pencil, Cross icon as On click */}
        <PencilIcon style={IconStyles} onClick={() => onEdit(id)} />
        <XIcon style={IconStyles} onClick={() => onDelete(id)} />
      </div>
      {/* Drop down category */}
      <Badge variant="info">{category}</Badge>
      {/* Amount that is added in Income/Expense card*/}
      <Row>
        <Col>{amount}</Col>
        {/* Date viewed in the Income/Expense card */}
        <Col className="text-right">{date}</Col>
      </Row>
      {/* Extra notes shown in the Income/Expense card in grey color*/}
      <p className="p-1 m-0 rounded" style={{ color: "grey" }}>
        {notes}
      </p>
    </ListGroup.Item>
  );
}
