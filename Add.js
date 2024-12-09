import React, {useState} from 'react';
import {TextInput, View, Text, Button, Switch} from "react-native";

const Add = ({navigation, route}) => {
    const [taskName, setTaskName] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <View style={{padding: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Task Name:</Text>
                <TextInput
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

            <Button title="SUBMIT"
                    onPress={() => {
                        let newTask = {key: taskName, completed: isCompleted};
                        route.params.setDatasource(prevData => {
                            const updatedData = [...prevData];
                            updatedData[0].data.push(newTask);
                            return updatedData;
                        });
                        navigation.navigate("Home");
                    }}
            />
        </View>
    );
};

export default Add;
