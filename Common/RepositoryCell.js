
import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

export default class RepositoryCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: props.projectModel.item.isFavorite,
            favoriteIcon: props.projectModel.item.isFavorite ? 'ic_star' : 'ic_unstar_transparent'
        }
    }

    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel.item.item, !this.state.isFavorite)
    }

    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.projectModel.item.isFavorite);
    }

    setFavoriteState(isFavorite) {
        this.setState({
            isFavorite:isFavorite,
            favoriteIcon: isFavorite ? 'ic_star' : 'ic_unstar_transparent'
        })
    }

    render() {

        let favoriteButton = <TouchableOpacity
            onPress={() => this.onPressFavorite()}
        >
            <Image style={{ width: 22, height: 22, tintColor: '#1296db' }} source={{ uri: this.state.favoriteIcon }} />
        </TouchableOpacity>

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onSelect}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{this.props.projectModel.item.item.full_name}</Text>
                    <Text style={styles.description}>{this.props.projectModel.item.item.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                        <View style={{ flexDirection: 'row', alignItems:'center'}}>
                            <Text>Author:</Text>
                            <Image
                                style={{ height: 22, width: 22 }}
                                source={{ uri: this.props.projectModel.item.item.owner.avatar_url }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row'}}>
                            <Text>Stars:</Text>
                            <Text>{this.props.projectModel.item.item.stargazers_count}</Text>
                        </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: '#212121',
        marginBottom: 2,
        fontSize: 16,
    },
    description: {
        borderRadius: 2,
        color: '#757575',
        marginBottom: 2,
        fontSize: 14,
    },
    cell_container: {
        elevation: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        borderColor: '#dddddd',
        marginVertical: 3,
        marginRight: 5,
        marginLeft: 5,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 0.5
    }
})