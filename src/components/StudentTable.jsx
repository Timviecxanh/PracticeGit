import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, setEditing } from "../redux/studentSlice";

export default function StudentTable() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.studentsData);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <table className="border w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Mã SV</th>
            <th className="p-2">Họ tên</th>
            <th className="p-2">SĐT</th>
            <th className="p-2">Email</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {students.map((sv) => (
            <tr key={sv.maSV} className="border-t text-center">
              <td>{sv.maSV}</td>
              <td>{sv.hoTen}</td>
              <td>{sv.sdt}</td>
              <td>{sv.email}</td>
              <td className="flex justify-center gap-3 py-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1"
                  onClick={() => dispatch(setEditing(sv))}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1"
                  onClick={() => dispatch(deleteStudent(sv.maSV))}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
