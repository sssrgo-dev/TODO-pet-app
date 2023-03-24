import FieldsWrapper from "../../components/layout/FieldsWrapper";

export default function TimeInput({ type, time, updateTodo }) {
  return (
    <FieldsWrapper>
      <label className="text-slate-500 text-xs" htmlFor={`${type}Time`}>
        {type}:
      </label>
      <input
        className="text-slate-500 text-xs"
        type="date"
        name={`${type}Time`}
        value={time ? time : ""}
        onChange={updateTodo}
      />
    </FieldsWrapper>
  );
}
