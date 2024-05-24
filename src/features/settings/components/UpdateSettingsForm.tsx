import { FocusEvent } from 'react'

import useSettings from '@/features/settings/hooks/useSettings'
import useUpdateSetting from '@/features/settings/hooks/useUpdateSetting'

import Spinner from '@/components/Spinner'
import Form from '@/components/Form'
import FormRow from '@/components/FormRow'
import Input from '@/components/Input'

function UpdateSettingsForm() {
  const {
    isLoadingAllSettings,
    allSettings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings()
  const { updateSetting, isUpdating } = useUpdateSetting()

  if (isLoadingAllSettings) return <Spinner />

  function handleUpdate(
    e: FocusEvent<HTMLInputElement, Element>,
    field:
      | 'minBookingLength'
      | 'maxBookingLength'
      | 'maxGuestsPerBooking'
      | 'breakfastPrice',
  ) {
    const { value } = e.target

    if (!value) return

    updateSetting({ [field]: value })
  }

  return (
    <Form type="normal">
      <FormRow label="Minimum nights/booking">
        <Input
          id="min-nights"
          type="number"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          id="max-nights"
          type="number"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          id="max-guests"
          type="number"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          id="breakfast-price"
          type="number"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
