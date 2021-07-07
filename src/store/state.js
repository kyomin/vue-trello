const state = {
  token: null,
  isAddBoardClicked: false,
  boards: [], // 보드 리스트 데이터도 뷰엑스 스토어에서 관리한다.
  board: {}, // 선택한 특정 보드의 정보
  card: {},
  bodyColor: '#ffffff',
  navbarColor: '#026aa7',
  isShowBoardSettings: false
}

export default state
