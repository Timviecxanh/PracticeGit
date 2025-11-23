import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../redux/studentSlice";

export default function StudentForm() {
  const dispatch = useDispatch();
  const studentEditing = useSelector((state) => state.students.studentEditing);

  const [form, setForm] = useState({
    maSV: "",
    hoTen: "",
    sdt: "",
    email: "",
  });
  const [error, setError] = useState({
    maSV: "",
    hoTen: "",
    sdt: "",
    email: "",
  });

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (studentEditing) {
      setForm(studentEditing);
      setError({ maSV: "", hoTen: "", sdt: "", email: "" });
      setValid(true);
    }
  }, [studentEditing]);

  const checkValid = (form, error) => {
    for (let key in form) {
      if (form[key].trim() === "") {
        setValid(false);
        return;
      }
    }

    for (let key in error) {
      if (error[key].trim() !== "") {
        setValid(false);
        return;
      }
    }

    setValid(true);
  };

  const handleChangeInput = (e) => {
    let { id, value } = e.target;

    let newForm = { ...form, [id]: value };
    let newError = { ...error };

    if (value.trim() === "") {
      newError[id] = ` không được để trống`;
    } else {
      newError[id] = "";

      if (id === "email") {
        const reg = /^[\w.-]+@[\w-]+\.[A-Za-z]{2,}$/;
        if (!reg.test(value)) newError[id] = "Email không đúng định dạng";
      }

      if (id === "sdt") {
        const reg = /^[0-9]{9,10}$/;
        if (!reg.test(value)) newError[id] = "SĐT phải có 9-10 chữ số";
      }
    }

    setForm(newForm);
    setError(newError);
    checkValid(newForm, newError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) {
      return;
    }
    if (studentEditing) {
      dispatch(updateStudent(form));
    } else {
      dispatch(addStudent(form));
    }
    setForm({ maSV: "", hoTen: "", sdt: "", email: "" });
    setValid(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Mã SV</label>
          <input
            id="maSV"
            value={form.maSV}
            onChange={handleChangeInput}
            className="border p-2 w-full"
            disabled={studentEditing}
          />
          <p className="text-red-500">{error.maSV}</p>
        </div>

        <div>
          <label>Họ tên</label>
          <input
            id="hoTen"
            value={form.hoTen}
            onChange={handleChangeInput}
            className="border p-2 w-full"
          />
          <p className="text-red-500">{error.hoTen}</p>
        </div>

        <div>
          <label>SĐT</label>
          <input
            id="sdt"
            value={form.sdt}
            onChange={handleChangeInput}
            className="border p-2 w-full"
          />
          <p className="text-red-500">{error.sdt}</p>
        </div>

        <div>
          <label>Email</label>
          <input
            id="email"
            value={form.email}
            onChange={handleChangeInput}
            className="border p-2 w-full"
          />
          <p className="text-red-500">{error.email}</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded disabled:bg-gray-400"
      >
        {studentEditing ? "Cập nhật" : "Thêm sinh viên"}
      </button>
    </form>
  );
}
