import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { String } from '../../Helper/string'
import { icons } from '../../Helper/icons'
import Headerviewbackarrow from '../../Componets/Headerviewbackarrow/Headerviewbackarrow'

const AskedQuestions = () => {
    const [is_select, setSelect] = useState(null)
    const [isUpArrow, setIsUpArrow] = useState(true);
    const [isUpArrow2, setIsUpArrow2] = useState(true);
    const [isUpArrow3, setIsUpArrow3] = useState(true);
    const [isUpArrow4, setIsUpArrow4] = useState(true);
    const [isUpArrow5, setIsUpArrow5] = useState(true);
    const [isUpArrow6, setIsUpArrow6] = useState(true);
    useEffect(() => {
        const id = 2;
        selectcard(id);
    }, []);
    const selectcard = async (id) => {
        setSelect(id)
    }
    const toggleArrow = () => {
        setIsUpArrow(!isUpArrow);
    };
    const toggleArrow2 = () => {
        setIsUpArrow2(!isUpArrow2);
    };
    const toggleArrow3 = () => {
        setIsUpArrow3(!isUpArrow3);
    };
    const toggleArrow4 = () => {
        setIsUpArrow4(!isUpArrow4);
    };
    const toggleArrow5 = () => {
        setIsUpArrow5(!isUpArrow5);
    };
    const toggleArrow6 = () => {
        setIsUpArrow6(!isUpArrow6);
    };
    return (
        <View style={styles.container}>
            <Headerviewbackarrow
                title={'FAQS'} />
            <Text style={styles.freque}>{String.frequ}</Text>
            <View style={styles.freqflexrow}>
                <TouchableOpacity style={[styles.fourbuttonview, { backgroundColor: is_select === 1 ? '#fff' : '#6f7990' }]} onPress={() => selectcard(1)}>
                    <Text style={[styles.buttontext, { color: is_select === 1 ? '#660099' : '#fff' }]}>{String.Prenatal}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fourbuttonview, { backgroundColor: is_select === 2 ? '#fff' : '#6f7990' }]} onPress={() => selectcard(2)}>
                    <Text style={[styles.buttontext, { color: is_select === 2 ? '#660099' : '#fff' }]}>{String.Confidence}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fourbuttonview, styles.fourbuttonview3, { backgroundColor: is_select === 3 ? '#fff' : '#6f7990' }]} onPress={() => selectcard(3)}>
                    <Text style={[styles.buttontext, { color: is_select === 3 ? '#660099' : '#fff' }]}>{String.Amount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fourbuttonview, styles.fourbuttonview2, { backgroundColor: is_select === 4 ? '#fff' : '#6f7990' }]} onPress={() => selectcard(4)}>
                    <Text style={[styles.buttontext, { color: is_select === 4 ? '#660099' : '#fff' }]}>{String.FAQ}</Text>
                </TouchableOpacity>
            </View>
            {is_select == '1' ? <View>

            </View> : null}
            {is_select == '2' ? <View>
                <ScrollView>
                    <View style={styles.flexrowdfd}>
                        <Text style={[styles.whattext, { color: isUpArrow3 ? '#fff' : '#b3b3b3' }]}>{String.What}</Text>
                        <TouchableOpacity onPress={toggleArrow3}>
                            <Image
                                source={isUpArrow3 ? icons.arrowdowntonavigate : icons.rightarrow}
                                style={styles.rightarrow}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margineview}></View>
                    <View style={styles.flexrowdfd}>
                        <Text style={[styles.whattext, { color: isUpArrow4 ? '#fff' : '#b3b3b3' }]}>{String.does}</Text>
                        <TouchableOpacity onPress={toggleArrow4}>
                            <Image
                                source={isUpArrow4 ? icons.arrowdowntonavigate : icons.rightarrow}
                                style={styles.rightarrow}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margineview}></View>
                    <View style={styles.flexrowdfd}>
                        <Text style={[styles.whattext, { color: isUpArrow ? '#fff' : '#b3b3b3' }]}>{String.can}</Text>
                        <TouchableOpacity onPress={toggleArrow}>
                            <Image
                                source={isUpArrow ? icons.arrowdowntonavigate : icons.rightarrow}
                                style={styles.rightarrow}
                            />
                        </TouchableOpacity>
                    </View>
                    {isUpArrow && (<View>
                        <Text style={[styles.whattext2]}>{String.benfit}</Text>
                    </View>)}
                    <View style={styles.margineview}></View>
                    <View style={styles.flexrowdfd}>
                        <Text style={[styles.whattext, { color: isUpArrow2 ? '#fff' : '#b3b3b3' }]}>{String.yoga}</Text>
                        <TouchableOpacity onPress={toggleArrow2}>
                            <Image
                                source={isUpArrow2 ? icons.arrowdowntonavigate : icons.rightarrow}
                                style={styles.rightarrow}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margineview}></View>
                    <View style={styles.flexrowdfd}>
                        <Text style={[styles.whattext, { color: isUpArrow5 ? '#fff' : '#b3b3b3' }]}>{String.disacvan}</Text>
                        <TouchableOpacity onPress={toggleArrow5}>
                            <Image
                                source={isUpArrow5 ? icons.arrowdowntonavigate : icons.rightarrow}
                                style={styles.rightarrow}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margineview}></View>

                    <View style={styles.flexrowdfd}>
                        <Text style={[styles.whattext, { color: isUpArrow6 ? '#fff' : '#b3b3b3' }]}>{String.besttime}</Text>
                        <TouchableOpacity onPress={toggleArrow6}>
                            <Image
                                source={isUpArrow6 ? icons.arrowdowntonavigate : icons.rightarrow}
                                style={styles.rightarrow}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View> : null}
            {is_select == '3' ? <View></View> : null}
            {is_select == '4' ? <View></View> : null}
        </View>
    )
}

export default AskedQuestions

