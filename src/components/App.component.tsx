import React from 'react'
import {
    Header,
    Container,
    Segment,
    Dimmer,
    Loader,
    Label,
    Input,
    InputOnChangeData
} from 'semantic-ui-react'
import LangButtonGroupComponent from './LangButtonGroup.component'
import LicenceChoiceComponent from './LicenseChoice.component'
import ShowRepositoriesComponent from './ShowRepositories.component'
import { RepositoryModel } from '../models/Repository.model'
import { searchRepositories, getAllLicenses } from '../api/github/repos.api'
import { UIlangs, ProgramLangs, getHeader } from '../constants/lang'
import { rowsCount } from '../constants/ui'
import { LoadStatuses } from '../constants/loadStatus'
import './App.css'

interface ComponentProps {}

interface ComponentState {
    repositories: RepositoryModel[]
    lang: string
    license: string
    licenses: string[]
    searchString: string
    loading: boolean
    loaded: boolean
    error: boolean
}

export default class App extends React.PureComponent<
    ComponentProps,
    ComponentState
> {
    constructor(props: ComponentProps) {
        super(props)
        this.state = {
            repositories: [],
            lang: 'JavaScript',
            license: '',
            licenses: [],
            searchString: '',
            loading: false,
            loaded: false,
            error: false
        }
    }

    async componentDidMount() {
        const { lang, license } = this.state
        this.loadRepositories(lang, license)
        let licenses = await getAllLicenses()
        licenses = licenses.map((l: any) => l.key)
        this.setState({ licenses })
    }

    async componentDidUpdate(
        prevProps: ComponentProps,
        prevState: ComponentState
    ) {
        if (prevState.lang !== this.state.lang) {
            this.loadRepositories(this.state.lang, this.state.license)
        }
        if (prevState.license !== this.state.license) {
            this.loadRepositories(this.state.lang, this.state.license)
        }
    }

    loadRepositories = async (lang: string, license: string) => {
        try {
            this.setState(() => LoadStatuses.LOADING)

            const repositories = await searchRepositories(lang, license)
            const reps = repositories.items.map(
                (rep: RepositoryModel) => new RepositoryModel(rep)
            )

            this.setState(
                Object.assign({ repositories: reps }, LoadStatuses.LOADED)
            )
        } catch (error) {
            this.setState(() => LoadStatuses.ERROR)
        }
    }

    changeLang = (lang: string) => {
        this.setState({ lang })
    }
    changeLicense = (license: string) => {
        this.setState({ license })
    }

    changeSearchInput = (
        event: React.ChangeEvent,
        searchString: InputOnChangeData
    ) => {
        this.setState({ searchString: searchString.value })
    }

    showLoader = (loading: boolean) => {
        if (loading) {
            return (
                <Dimmer active>
                    <Loader>{UIlangs.loading}</Loader>
                </Dimmer>
            )
        }
        return null
    }

    render() {
        const {
            repositories,
            lang,
            loading,
            error,
            searchString,
            license,
            licenses
        } = this.state
        return (
            <div className='App'>
                <Container>
                    <Header as='h1'>{getHeader(lang)}</Header>
                    <LangButtonGroupComponent
                        ProgramLangs={ProgramLangs}
                        activeLang={lang}
                        onChangeLang={this.changeLang}
                    />
                    <Segment.Group size='tiny'>
                        <Segment>
                            <LicenceChoiceComponent
                                licenses={licenses}
                                activeLicense={license}
                                onChangeLicense={this.changeLicense}
                            />
                        </Segment>
                        <Segment>
                            <Input
                                placeholder={UIlangs.SearchByName}
                                onChange={this.changeSearchInput}
                            />
                        </Segment>
                    </Segment.Group>
                    {this.showLoader(loading)}
                    <ShowRepositoriesComponent
                        repositories={repositories}
                        searchString={searchString}
                        rowsCount={rowsCount}
                    />
                    {error && <Label>{error}</Label>}
                </Container>
            </div>
        )
    }
}
