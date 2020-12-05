import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../styles';

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {

  const { title } = props;

  return (
    <View style={{ backgroundColor: colors.themeColor }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: colors.white, fontSize: 30, marginTop: 60 }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
