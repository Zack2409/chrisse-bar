import { mount } from '@vue/test-utils'
import NewSale from '@/views/NewSale.vue'

describe('NewSale.vue', () => {
  it('renders tab 1 NewSale', () => {
    const wrapper = mount(NewSale)
    expect(wrapper.text()).toMatch('Tab 1 page')
  })
})
