/* eslint-disable react/no-unescaped-entities */
import { useAttendanceStore } from "@/stores/attendances/attendanceStore";
import { useEffect } from "react";
import Loading from "@/components/Loading";

import StudentAttendanceRow from "@/components/StudentAttendanceRow";
import { DatePicker } from "@/components/DatePicker";

export default function AttendanceSheet() {
  const dates = useAttendanceStore((state) => state.dates);
  const records = useAttendanceStore((state) => state.records);
  const loading = useAttendanceStore((state) => state.loading);
  const error = useAttendanceStore((state) => state.error);
  const addNewDate = useAttendanceStore((state) => state.addNewDate);
  const fetchDatesAndRecords = useAttendanceStore(
    (state) => state.fetchDatesAndRecords
  );

  useEffect(() => {
    fetchDatesAndRecords();
  }, [fetchDatesAndRecords]);

  return (
    <div className="w-full px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium py-6">
          College Physics 1 - COM231
        </h2>

        <button className="bg-green-600/80 h-10 px-4 rounded-lg text-white shadow hover:bg-green-500/90 transition">
          Save changes
        </button>
      </div>

      <div className="w-full h-full max-h-[830px] max-w-[1600px] border border-mistGray shadow rounded-md">
        <div className="h-[770px] overflow-x-auto overflow-y-auto no-scrollbar rounded-md">
          {error && (
            <h3 className="text-red-400 text-center text-2xl font-medium">
              {error}
            </h3>
          )}

          {loading && <Loading />}
          {!loading && records.length === 0 && (
            <p className="text-center pt-32 text-2xl font-light">
              No student found. Navigate to the masterlist of this class and
              click
              <span className="text-blue-600 font-medium tracking-wide px-2">
                'Add student'
              </span>
              to get started and manage your students
            </p>
          )}

          {!loading && records.length !== 0 && (
            <div className="max-h-[830px] overflow-x-auto no-scrollbar">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr className="border-b ">
                    <th className="min-w-[200px] text-md text-start text-gray-700 px-4 py-3">
                      Student Name
                    </th>
                    {dates.map((date) => (
                      <th
                        className="min-w-[150px] text-md text-start text-gray-700 px-4 py-3"
                        key={date.date_id}
                      >
                        <DatePicker date={date} />
                      </th>
                    ))}
                    <th className="min-w-[150px]">
                      <button
                        onClick={addNewDate}
                        className="bg-green-600/80 h-8 px-4 rounded-lg text-white shadow hover:bg-green-500/90 transition"
                      >
                        Add date
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody className="">
                  {records.map((record, index) => (
                    <StudentAttendanceRow
                      key={record.studentNumber}
                      record={record}
                      dates={dates}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
