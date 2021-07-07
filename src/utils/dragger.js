/*
    @@@@@@@@@@@@@@@@@@@@@@
        dragula module wrapper
    @@@@@@@@@@@@@@@@@@@@@@
*/
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

const dragger = {
  init (container) {
    return dragula([...container])
  },
  siblings ({ el, wrapper, candidates, type }) {
    // get cardId or listId
    const curId = el.dataset[type + 'Id'] * 1

    // 위 아래로 어떤 카드들이 있는지
    let prev = null
    let next = null

    candidates
      .forEach((el, idx, arr) => {
        const id = el.dataset[type + 'Id'] * 1

        // 배열을 순회하며 현재 drag & drop하려는 카드와 같은 원소를 찾는다.
        // 그 후, 앞 뒤 카드들의 정보를 get한다.
        if (id === curId) {
          prev = idx > 0 ? {
            id: arr[idx - 1].dataset[type + 'Id'] * 1,
            pos: arr[idx - 1].dataset[type + 'Pos'] * 1
          } : null // 현재 타겟이 첫 번째 위치라면 이전 카드는 없는 것으로 판단!

          next = idx < arr.length - 1 ? {
            id: arr[idx + 1].dataset[type + 'Id'] * 1,
            pos: arr[idx + 1].dataset[type + 'Pos'] * 1
          } : null
        }
      })

    return { prev, next }
  }
}

export default dragger
