import apiClient from "./apiClient";

export interface AttendanceLogDto {
  studentName: string;
  nfcUid: string;
  requestTime: string;
  status: string;
}

export interface MyStudentDto {
  id: number;
  username: string;
  grade: string;
}

export interface CongestionDto {
  avgJamFactor: number;
  status: string;
}

export const parentService = {
  async getAttendanceLogs(): Promise<AttendanceLogDto[]> {
    const { data } = await apiClient.get<AttendanceLogDto[]>(
      "/api/v1/exitlog/get/my-logs"
    );
    return data;
  },

  async getMyStudents(): Promise<MyStudentDto[]> {
    const { data } = await apiClient.get<MyStudentDto[]>(
      "/api/v1/student/get/my-students"
    );
    return data;
  },

  async checkCongestion(studentId: number): Promise<CongestionDto> {
    const { data } = await apiClient.get<CongestionDto>(
      `/api/v1/parent/congestion/overview/student/${Number(studentId)}`
    );
    return data;
  },
};
