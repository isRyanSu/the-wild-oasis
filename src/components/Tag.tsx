import styled from 'styled-components'

type TagType = {
  type: 'blue' | 'green' | 'silver'
}

const Tag = styled.span<TagType>`
  width: fit-content;
  padding: 0.4rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;

  /* 用 CSS 自定义属性来设置颜色 */
  color: ${(props) => `var(--color-${props.type}-700)`};
  text-transform: uppercase;
  background-color: ${(props) => `var(--color-${props.type}-100)`};
  border-radius: 100px;
`

export default Tag
