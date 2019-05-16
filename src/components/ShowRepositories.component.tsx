import * as React from 'react'
import { Card, Image, Segment } from 'semantic-ui-react'
import { RepositoryModel } from '../models/Repository.model'
import { Columns } from '../constants/ui'
import { UIlangs } from '../constants/lang'

import { formatDate } from '../utils/formatDate'

export interface IShowRepositoriesProps {
    repositories: RepositoryModel[]
    searchString: string
    rowsCount: Columns
}

export default class ShowRepositoriesComponent extends React.Component<
    IShowRepositoriesProps,
    any
> {
    public render() {
        let { repositories, searchString, rowsCount } = this.props
        if (!repositories.length) return null
        if (searchString.length) {
            repositories = repositories.filter(
                rep => rep.name.indexOf(searchString) + 1
            )
        }
        return (
            <Segment size='tiny'>
                <Card.Group itemsPerRow={rowsCount}>
                    {repositories.map(rep => (
                        <Card key={`${rep.owner.id}-${rep.name}`}>
                            <Image
                                src={rep.owner.avatar_url}
                                wrapped
                                ui={false}
                                as='a'
                                size='tiny'
                                href={rep.owner.html_url}
                                target='_blank'
                            />
                            <Card.Content>
                                <Card.Header
                                    as='a'
                                    href={rep.owner.html_url}
                                    target='_blank'
                                >
                                    {rep.owner.login}
                                </Card.Header>
                                <Card.Meta>
                                    {UIlangs.Language} {rep.language}
                                </Card.Meta>
                                <Card.Meta>
                                    {UIlangs.Created}
                                    {formatDate(rep.created_at)}
                                </Card.Meta>
                                <Card.Description
                                    as='a'
                                    href={rep.html_url}
                                    target='_blank'
                                >
                                    {UIlangs.RepositoryName} {rep.name}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </Segment>
        )
    }
}
