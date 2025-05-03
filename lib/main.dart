
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:wax_wizard/screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Wax Wizard',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.light(
          primary: const Color(0xFFFFA726),
          onPrimary: Colors.white,
          secondary: const Color(0xFFFFECB3),
          background: Colors.white,
          surface: Colors.white,
        ),
        textTheme: TextTheme(
          displayLarge: GoogleFonts.playfairDisplay(
            fontWeight: FontWeight.bold,
            fontSize: 32,
            color: const Color(0xFFFFA726),
          ),
          titleLarge: GoogleFonts.playfairDisplay(
            fontWeight: FontWeight.bold,
            fontSize: 24,
          ),
          bodyLarge: GoogleFonts.poppins(
            fontSize: 16,
          ),
          bodyMedium: GoogleFonts.poppins(
            fontSize: 14,
          ),
        ),
        fontFamily: GoogleFonts.poppins().fontFamily,
      ),
      home: const HomeScreen(),
    );
  }
}
