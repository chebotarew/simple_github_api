import * as React from 'react'
import { Dropdown } from 'semantic-ui-react'
export interface ILicenceChoiceProps {
    licenses: string[]
    activeLicense: string
    onChangeLicense: (license: string) => void
}

export default class LicenceChoiceComponent extends React.Component<
    ILicenceChoiceProps,
    any
> {
    public render() {
        const { licenses, onChangeLicense, activeLicense } = this.props
        return (
            <Dropdown placeholder='Select License' text={activeLicense}>
                <Dropdown.Menu>
                    {licenses.map(license => (
                        <Dropdown.Item
                            key={license}
                            onClick={() => onChangeLicense(license)}
                        >
                            {license}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}
