import React, {useState} from 'react';
import {TextInput, View, Text, Button, Alert, Switch} from "react-native";

const Edit = ({navigation, route}) => {
    const [taskName, setTaskName] = useState(route.params.key);
    const [isCompleted, setIsCompleted] = useState(route.params.completed);

    return (
        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Task Name:</Text>
                <TextInput
                    value={taskName}
                    style={{borderWidth: 1}}
                    onChangeText={(text) => setTaskName(text)}
                />
            </View>

            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Completed:</Text>
                <Switch
                    value={isCompleted}
                    onValueChange={setIsCompleted}
                />
            </View>

            <View style={{padding: 10}}>
                <Button title="SAVE"
                        onPress={() => {
                            route.params.setDatasource(prevData => {
                                const updatedData = [...prevData];
                                updatedData[0].data[route.params.index] = {
                                    key: taskName,
                                    completed: isCompleted
                                };
                                return updatedData;
                            });
                            navigation.navigate("Home");
                        }}
                />
                <Button title="DELETE"
                        onPress={() => {
                            Alert.alert("Are you sure?", '',
                                [{text: 'Yes', onPress: () => {
                                        route.params.setDatasource(prevData => {
                                            const updatedData = [...prevData];
                                            updatedData[0].data.splice(route.params.index, 1);
                                            return updatedData;
                                        });
                                        navigation.navigate("Home");
                                    }},
                                    {text:'No'}])
                        }}
                />
            </View>
        </View>
    );
};

export default Edit;
