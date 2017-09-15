import DatePicker from '../index'
import { contrast } from '../../../util/color'

describe('DatePicker.theme', () => {
  describe('with the canvas theme', () => {
    const variables = DatePicker.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
      expect(contrast(variables.todayBackground, variables.todayColor)).to.be.above(3)
      expect(contrast(variables.selectedBackground, variables.selectedColor)).to.be.above(3)
      expect(contrast(variables.background, variables.otherMonthColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = DatePicker.generateTheme('canvas-a11y')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
      expect(contrast(variables.todayBackground, variables.todayColor)).to.be.above(4.5)
      expect(contrast(variables.selectedBackground, variables.selectedColor)).to.be.above(4.5)
      expect(contrast(variables.background, variables.otherMonthColor)).to.be.above(4.5)
    })
  })

  describe('with the modern theme', () => {
    const variables = DatePicker.generateTheme('modern')

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
      expect(contrast(variables.todayBackground, variables.todayColor)).to.be.above(3)
      expect(contrast(variables.selectedBackground, variables.selectedColor)).to.be.above(3)
      expect(contrast(variables.background, variables.otherMonthColor)).to.be.above(3)
    })
  })

  describe('with the accessible modern theme', () => {
    const variables = DatePicker.generateTheme('modern-a11y')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
      expect(contrast(variables.todayBackground, variables.todayColor)).to.be.above(4.5)
      expect(contrast(variables.selectedBackground, variables.selectedColor)).to.be.above(4.5)
      expect(contrast(variables.background, variables.otherMonthColor)).to.be.above(4.5)
    })
  })
})
