import * as React from 'react'
import { Button } from 'semantic-ui-react'

export interface ILangButtonGroupProps {
    ProgramLangs: string[]
    activeLang: string
    onChangeLang: (lang: string) => void
}

export default class LangButtonGroupComponent extends React.PureComponent<
    ILangButtonGroupProps
> {
    public render() {
        const { activeLang, ProgramLangs, onChangeLang } = this.props
        return ProgramLangs.map((progLang: string) => (
            <Button
                key={progLang}
                active={activeLang === `${progLang}`}
                onClick={() => onChangeLang(progLang)}
            >
                {progLang}
            </Button>
        ))
    }
}
