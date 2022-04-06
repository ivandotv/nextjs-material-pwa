import { PaginationDot } from 'components/slideshow'

export function Pagination({
  dots,
  index,
  onChangeIndex
}: {
  dots: number
  index: number
  onChangeIndex: (i: number) => void
}) {
  const children = []

  for (let i = 0; i < dots; i += 1) {
    children.push(
      <PaginationDot
        key={i}
        index={i}
        active={i === index}
        onClick={onChangeIndex}
      />
    )
  }

  return <div>{children}</div>
}
