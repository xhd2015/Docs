--------------------------------------------------------------------------------
-- Company: 
-- Engineer:
--
-- Create Date:   11:05:16 07/27/2016
-- Design Name:   
-- Module Name:   H:/RegularCPU_withNoIO/TestWriteBack.vhd
-- Project Name:  RegularCPU
-- Target Device:  
-- Tool versions:  
-- Description:   
-- 
-- VHDL Test Bench Created by ISE for module: WriteBack
-- 
-- Dependencies:
-- 
-- Revision:
-- Revision 0.01 - File Created
-- Additional Comments:
--
-- Notes: 
-- This testbench has been automatically generated using types std_logic and
-- std_logic_vector for the ports of the unit under test.  Xilinx recommends
-- that these types always be used for the top-level I/O of a design in order
-- to guarantee that the testbench will bind correctly to the post-implementation 
-- simulation model.
--------------------------------------------------------------------------------
LIBRARY ieee;
USE ieee.std_logic_1164.ALL;
 
-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--USE ieee.numeric_std.ALL;
 
ENTITY TestWriteBack IS
END TestWriteBack;
 
ARCHITECTURE behavior OF TestWriteBack IS 
 
    -- Component Declaration for the Unit Under Test (UUT)
 
    COMPONENT WriteBack
    PORT(
         cs : IN  std_logic;
         cs_alu : IN  std_logic;
         data_in : IN  std_logic_vector(15 downto 0);
         reset : IN  std_logic;
         if_write : IN  std_logic;
         if_pc : IN  std_logic;
         pc_update : OUT  std_logic;
         pc_out : OUT  std_logic_vector(15 downto 0);
         reg_update : OUT  std_logic;
         reg_out : OUT  std_logic_vector(7 downto 0)
        );
    END COMPONENT;
    

   --Inputs
   signal cs : std_logic := '0';
   signal cs_alu : std_logic := '0';
   signal data_in : std_logic_vector(15 downto 0) := (others => '0');
   signal reset : std_logic := '0';
   signal if_write : std_logic := '0';
   signal if_pc : std_logic := '0';

 	--Outputs
   signal pc_update : std_logic;
   signal pc_out : std_logic_vector(15 downto 0);
   signal reg_update : std_logic;
   signal reg_out : std_logic_vector(7 downto 0);
   -- No clocks detected in port list. Replace <clock> below with 
   -- appropriate port name 
 
   constant clock_period : time := 10 ns;
 
BEGIN
 
	-- Instantiate the Unit Under Test (UUT)
   uut: WriteBack PORT MAP (
          cs => cs,
          cs_alu => cs_alu,
          data_in => data_in,
          reset => reset,
          if_write => if_write,
          if_pc => if_pc,
          pc_update => pc_update,
          pc_out => pc_out,
          reg_update => reg_update,
          reg_out => reg_out
        );



   -- Stimulus process
   stim_proc: process
   begin		
      -- hold reset state for 100 ns.
      wait for 100 ns;	
		reset<='1';
      wait for clock_period*10;
		reset<='0';
		cs_alu<='1';
		if_write<='1';
		wait for clock_period*10;
		cs_alu<='0';
		cs<='1';
		data_in<="0011001111001111";
		wait for clock_period*10;
		cs<='0';
		cs_alu<='1';
		if_write<='1';
		if_pc<='1';
		wait for clock_period*10;
		cs_alu<='0';
		cs<='1';
		data_in<="0000001111111111";
      -- insert stimulus here 

      wait;
   end process;

END;
