import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native-paper'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

import theme from '@/services/theme'

type Label = string
type Value = string | number | boolean | null

interface _Item {
  label: string,
  value: Value,
  color?: string
}

interface BaseItem {
  [key: string]: any
}

interface SelectProps<Item extends BaseItem> {
  label: string,
  placeholder: string,

  value: Value | Item,
  options: Item[],
  fullValue?: boolean,
  onChange: ((item: Value | Item) => void),
  optionLabel?: keyof Item | ((item: Item) => Label),
  optionValue?: keyof Item | ((item: Item) => Value),

  error?: string | boolean
}

export default class Select<Item extends BaseItem> extends React.Component<SelectProps<Item>> {
  static propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    fullValue: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    optionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
  }

  static defaultProps = {
    fullValue: false,
    optionLabel: 'label',
    optionValue: 'value',

    error: false
  }

  get value (): Value {
    let value: any = this.props.value
    if (value && this.props.fullValue) value = this.optionValueFn(value)
    return value
  }

  get options (): _Item[] {
    return this.props.options.map(x => {
      const item: _Item = { label: this.optionLabelFn(x), value: this.optionValueFn(x) }
      if (this.value === item.value) item.color = theme.colors.primary
      return item
    })
  }

  get placeholder (): RNPickerSelect['props']['placeholder'] {
    const color = theme.colors[this.props.error ? 'error' : 'placeholder']
    return { label: this.props.placeholder, value: null, color }
  }

  optionLabelFn = (item: Item): Label => {
    let value: any
    const optionFn: any = this.props.optionLabel
    if (typeof optionFn === 'string') value = item[optionFn]
    else value = optionFn(item)
    return String(value)
  }

  optionValueFn = (item: Item): Value => {
    let value: any
    const optionFn: any = this.props.optionValue
    if (typeof optionFn === 'string') value = item[optionFn]
    else value = optionFn(item)
    return value
  }

  handleChange = (value: Value) => {
    let item: Value | Item = value
    if (this.props.fullValue) item = this.props.options.find(x => this.optionValueFn(x) === value)
    this.props.onChange(item)
  }

  renderPickerSelect = () => {
    return (
      <View style={styles.selectContainer}>
        <RNPickerSelect
          style={styles}
          value={this.value}
          items={this.options}
          placeholder={this.placeholder}
          onValueChange={this.handleChange}
        />
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          value="label-up"
          style={styles.input}
          label={this.props.label}
          render={this.renderPickerSelect}
          error={typeof this.props.error === 'string'}
        />
        {this.props.error &&
          <Text style={styles.error}>{this.props.error}</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    width: '100%',
    paddingHorizontal: '8%'
  },
  input: {
    width: '100%'
  },
  error: {
    marginTop: 4,
    marginLeft: 4,
    color: theme.colors.error
  },
  selectContainer: {
    flex: 1,
    marginTop: 16,
    justifyContent: 'center'
  },

  viewContainer: {},
  iconContainer: {},
  modalViewTop: {},
  modalViewMiddle: {},
  chevronContainer: {},
  chevron: {},
  chevronUp: {},
  chevronDown: {},
  chevronActive: {},
  done: {},
  doneDepressed: {},
  modalViewBottom: {},
  placeholder: {
    color: theme.colors.placeholder
  },
  headlessAndroidPicker: {},

  inputIOS: {
    color: theme.colors.text
  },
  inputAndroid: {
    marginLeft: -4,
    color: theme.colors.text
  },
  inputIOSContainer: {},
  inputAndroidContainer: {},
  headlessAndroidContainer: {}
})
